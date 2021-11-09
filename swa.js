"/pg?page={page}&limit={limit}": {
    "get": {
        "summary": "get items",
        "tags": [ "Items" ],
        "parameters": [
            {
                "in": "path",
                "name": "page",
                "required": true,
                "description": "The number of items to skip before starting to collect the result",
                "schema": {
                    "$ref": "#/definitions/?page={page}&limit={limit}",
                    "type": "integer"
                }
            },
            {
                "in": "path",
                "name": "limit",
                "required": true,
                "description": "The numbers of items to return",
                "schema": {
                    "$ref": "#/definitions/?page={page}&limit={limit}",
                    "type": "integer"
                }
            }
        ],
        "responses": {
            "200": {
                "description": "OK",
                "schema": {
                    "$ref": "#/definitions/Item"
                }
            },
            "404": {
                "description": "Failed not found."
            }
        }
    }
   
}