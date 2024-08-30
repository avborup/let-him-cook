export const importWasm = () => {
  return typeof window === "undefined"
    ? importServerWasm()
    : importClientWasm();
};

export const importServerWasm = () => import("@/public/wasm-server");

export const importClientWasm = async () => {
  const module = await import("@/public/wasm-client");
  const init = module.default as unknown as () => Promise<any>;
  await init();
  return module;
};

export type WasmModule = Awaited<ReturnType<typeof importWasm>>;
