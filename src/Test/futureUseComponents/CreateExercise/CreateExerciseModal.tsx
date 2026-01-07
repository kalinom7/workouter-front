interface ModalProps {
  readonly onClose: () => void;
  readonly onSubmit: (data: {
    name: string;
    description?: string;
  }) => void;
}

function CreateExerciseModal({ onClose, onSubmit }: ModalProps) {
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);

    const name = formData.get("name") as string;
    const description = formData.get("description") as string | null;

    onSubmit({
      name,
      description: description || undefined,
    });

    onClose();
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div
        className="modal-content"
        onClick={(e) => e.stopPropagation()}
      >
        <h2>Create Exercise</h2>

        <form onSubmit={handleSubmit}>
          <input
            name="name"
            placeholder="Exercise name"
            required
          />

          <textarea
            name="description"
            placeholder="Description (optional)"
          />

          <button type="submit">Create</button>
          <button type="button" onClick={onClose} className="close-button">
            Close
          </button>
        </form>
      </div>
    </div>
  );
}

export default CreateExerciseModal;
