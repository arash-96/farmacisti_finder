import PropTypes from "prop-types";
import "../styles/Note.css"

Note.propTypes = {
    note: PropTypes.shape({
        id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
        title: PropTypes.string.isRequired,
        content: PropTypes.string.isRequired,
        created_at: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
    }).isRequired,
    onDelete: PropTypes.func.isRequired,
};

function Note({note, onDelete}) {
    const formattedDate = new Date(note.created_at).toLocaleDateString("en-US")

    return <div className="note-conatiner">
        <p className="note-title">{note.title}</p>
        <p className="note-content">{note.content}</p>
        <p className="note-date">{formattedDate}</p>
        <button className="delete-button" onClick={() => onDelete(note.id)}>
            Delete
        </button>
    </div>
}

export default Note;