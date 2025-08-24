import React from "react";

interface ProjectFormProps {
  formData: {
    name: string;
    projectLevel: string;
    hoursExperience: string;
    description: string;
  };
  editingProjectId: string | null;
  handleInputChange: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => void;
  handleSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
  clearForm: () => void;
}

const ProjectForm: React.FC<ProjectFormProps> = ({ formData, editingProjectId, handleInputChange, handleSubmit, clearForm }) => (
  <form className="horizontal-form" onSubmit={handleSubmit}>
    <div className="form-item">
      <label htmlFor="name">Project Name</label>
      <input
        className="input-box"
        id="name"
        name="name"
        value={formData.name}
        onChange={handleInputChange}
        required
      />
    </div>
    <div className="form-item">
      <label htmlFor="projectLevel">Project Level</label>
      <select
        className="input-box"
        id="projectLevel"
        name="projectLevel"
        value={formData.projectLevel}
        onChange={handleInputChange}
        required
      >
        <option value="0">Basic</option>
        <option value="1">Novice</option>
        <option value="2">Intermediate</option>
        <option value="3">Advanced</option>
        <option value="4">Expert</option>
      </select>
    </div>
    <div className="form-item">
      <label htmlFor="hoursExperience">Hours</label>
      <input
        className="input-box"
        id="hoursExperience"
        name="hoursExperience"
        type="number"
        value={formData.hoursExperience}
        onChange={handleInputChange}
        required
      />
    </div>
    <div className="form-item grow">
      <label htmlFor="description">Description</label>
      <textarea
        className="input-box"
        id="description"
        name="description"
        value={formData.description}
        onChange={handleInputChange}
        required
      />
    </div>
    <div className="form-actions">
      <button type="submit" className="btn-primary">
        {editingProjectId ? "Update Project" : "Add Project"}
      </button>
      <button type="button" className="btn-secondary" onClick={clearForm}>
        Clear
      </button>
    </div>
  </form>
);

export default ProjectForm;
