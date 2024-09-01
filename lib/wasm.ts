export const importWasm = () => {
  return typeof window === "undefined"
    ? importServerWasm()
    : importClientWasm();
};

export const importServerWasm = () => import("@/cooklang-wasm/pkg/wasm-server");

export const importClientWasm = async () => {
  const module = await import("@/cooklang-wasm/pkg/wasm-client");
  const init = module.default as unknown as () => Promise<any>;
  await init();
  return module;
};

export type WasmModule = Awaited<ReturnType<typeof importWasm>>;
