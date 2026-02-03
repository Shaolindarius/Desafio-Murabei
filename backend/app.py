
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

if __name__ == "__main__":
    app.run(debug=True, port=5000)
