# Repro: scoped styled-jsx loses its scoping class under `experimental.turbopackRustReactCompiler`

Minimal reproduction for a Next.js 16.3.0 regression: with the React Compiler
running through its Rust port in Turbopack, the `jsx-<hash>` scoping class is
no longer added to conditionally-rendered elements inside stateful components,
so scoped `<style jsx>` rules silently never match.

## Reproduce

```bash
pnpm install

# React Compiler via Babel — works
RUST_COMPILER=0 pnpm dev -p 3412
curl -s localhost:3412 | grep -o 'class="[^"]*fade-label[^"]*"'
# class="jsx-34e81125737cd5c5 fade-label"

# React Compiler via the Rust port in Turbopack — scoping class dropped
RUST_COMPILER=1 pnpm dev -p 3411
curl -s localhost:3411 | grep -o 'class="[^"]*fade-label[^"]*"'
# class="fade-label"
```

The trigger is the combination of component state and a conditional element
(`{expanded && <span className="fade-label">…}`) — a static component keeps
its scoping class under both configurations. See `app/Label.tsx`.
