# Let Him Cook

A simple recipe app built with Next.js and Supabase. Its primary objective is to be a personalised way to browse and view recipes, allowing fuzzy-finding, filtering based on ingredients and categories, ratings from a close group of friends, and more.

## Run locally

1. You'll first need a Supabase project which can be made [via the Supabase dashboard](https://database.new)

2. Clone this repo and open a terminal in the root directory

3. Compile the `cooklang-wasm` crate to WebAssembly (see the README in `cooklang-wasm`).

4. Create `.env.local` and populate the following keys:

   ```
   NEXT_PUBLIC_SUPABASE_URL=[INSERT SUPABASE PROJECT URL]
   NEXT_PUBLIC_SUPABASE_ANON_KEY=[INSERT SUPABASE PROJECT API ANON KEY]
   ```

   Both `NEXT_PUBLIC_SUPABASE_URL` and `NEXT_PUBLIC_SUPABASE_ANON_KEY` can be found in [your Supabase project's API settings](https://app.supabase.com/project/_/settings/api)

5. You can now run the Next.js local development server:

   ```bash
   yarn dev
   ```

> Check out [the docs for Local Development](https://supabase.com/docs/guides/getting-started/local-development) to also run Supabase locally.

## Libraries and tools

To give a quick overview, this project uses:

- [Next.js](https://nextjs.org/) for UI focused on server rendering and static site generation
- [Supabase](https://supabase.io/) for the database, storage, and authentication
- [Cooklang](https://cooklang.org/) as a markup language for defining recipes (using extensions from [`cooklang-rs`](https://github.com/cooklang/cooklang-rs))
- [Tailwind CSS](https://tailwindcss.com/) for styling
- [shadcn/ui](https://ui.shadcn.com/) for UI components
- [wasm-pack](https://github.com/rustwasm/wasm-pack) to generate WebAssembly from Rust
