document.addEventListener('DOMContentLoaded', function () {
    const form = document.getElementById('noteForm');
    if (form) {
        form.addEventListener('submit', async function (e) {
            e.preventDefault();

            const nom = document.getElementById('nom').value;
            const prenom = document.getElementById('prenom').value;
            const classe = document.getElementById('classe').value;
            const note = document.getElementById('note').value;
            const commentaires = document.getElementById('commentaires').value;

            const response = await fetch('http://localhost:5000/notes', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ nom, prenom, classe, note, commentaires }),
            });

            if (response.ok) {
                alert('Note soumise avec succès!');
                form.reset();
            } else {
                alert('Erreur lors de la soumission de la note.');
            }
        });
    }

    const notesTable = document.getElementById('notesTable');
    if (notesTable) {
        fetch('http://localhost:5000/notes')
            .then(response => response.json())
            .then(data => {
                const tbody = notesTable.querySelector('tbody');
                data.forEach(note => {
                    const row = document.createElement('tr');
                    row.innerHTML = `
                        <td>${note.nom}</td>
                        <td>${note.prenom}</td>
                        <td>${note.classe}</td>
                        <td>${note.note}</td>
                        <td>${note.commentaires}</td>
                    `;
                    tbody.appendChild(row);
                });
            });
    }
});

