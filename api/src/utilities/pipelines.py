from api.src.models.objectid import PydanticObjectId


def get_rank(_id: PydanticObjectId) -> list:
    return [
        {
            '$addFields': {
                'nbr_participation': {
                    '$size': '$exercises'
                }
            }
        }, {
            '$sort': {
                'experience': -1,
                'nbr_participation': -1,
                'name': 1
            }
        }, {
            '$group': {
                '_id': '',
                'items': {
                    '$push': '$$ROOT'
                }
            }
        }, {
            '$unwind': {
                'path': '$items',
                'includeArrayIndex': 'items.rank'
            }
        }, {
            '$match': {
                'items._id': _id
            }
        }, {
            '$project': {
                'items.rank': 1,
                '_id': 0
            }
        }
    ]


pipelines: dict = {
    "get_rank": get_rank
}
