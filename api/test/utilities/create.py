def create_collections(collections: list):
    from api.globals import db, client
    for collection_name in collections:
        db.create_collection(collection_name)  # Force create!
    return db, client
