use cooklang::Extensions;
use cooklang::{Converter, CooklangParser};
use serde_json::json;
use wasm_bindgen::prelude::*;

#[wasm_bindgen]
pub fn parse(input: &str) -> JsValue {
    let parser = CooklangParser::new(Extensions::all(), Converter::bundled());

    let (recipe, report) = parser.parse(input).into_tuple();

    let ret = json!({
        "recipe": recipe,
        "report": report.to_string()
    });

    serde_wasm_bindgen::to_value(&ret).unwrap()
}
