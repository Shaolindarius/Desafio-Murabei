
from flask import Flask, jsonify , request
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

books = [
    {"id": 1, "titulo": "O Senhor dos Anéis", "autor": "J.R.R. Tolkien", "ano": 1954},
    {"id": 2, "titulo": "1984", "autor": "George Orwell", "ano": 1949}
]

@app.route("/books", methods=['GET' , 'POST'])
def handle_books():
    if request.method == 'POST':
        novo_dado = request.get_json()
        novo_livro = {
            "id": len(books) + 1,
            "titulo": novo_dado.get("titulo"),
            "autor": novo_dado.get("autor"),
            "ano": novo_dado.get("ano")
        }
        books.append(novo_livro)
        return jsonify(novo_livro), 201
    return jsonify(books)

# # GET /api/v1/books
# @app.route("/api/v1/books", methods=["GET"])
# def get_books():

#     conn = sqlite3.connect('db.sqlite')
#     cursor = conn.cursor()

#     # Execute a SELECT query to fetch all books
#     cursor.execute('SELECT * FROM book;')
#     books = cursor.fetchall()

#     # Convert the books data to a list of dictionaries
#     book_list = []
#     for book in books:
#         book_dict = {
#             'id': book[0],
#             'title': book[1],
#             'author': book[2],
#             'year': book[3],
#             'genre': book[4]
#         }
#         book_list.append(book_dict)

#     # Close the database connection
#     conn.close()

#     # Return the books as a JSON response
#     return jsonify(book_list)

# # GET /api/v1/authors

if __name__ == "__main__":
    app.run(debug=True, port=5000)
