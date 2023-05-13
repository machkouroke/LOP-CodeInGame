def get_keys(dictionary: dict, keys: list) -> dict:
    keys += ["_id"]
    return {key: dictionary.get(key, None) for key in keys}