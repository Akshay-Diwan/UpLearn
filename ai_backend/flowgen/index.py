def sanitize_mermaid(code: str) -> str:
    code = code.replace("(", "[").replace(")", "]")
    code = code.replace(":", " -")
    code = code.replace("&", "and")
    return code;