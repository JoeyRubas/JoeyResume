import React from "react";

interface SkillFormProps {
  formData: {
    name: string;
    skillLevel: string;
    hoursExperience: string;
    description: string;
  };
  editingSkillId: string | null;
  handleInputChange: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => void;
  handleSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
  clearForm: () => void;
}

const SkillForm: React.FC<SkillFormProps> = ({ formData, editingSkillId, handleInputChange, handleSubmit, clearForm }) => (
  <form className="horizontal-form" onSubmit={handleSubmit}>
    <div className="form-item">
      <label htmlFor="name">Skill Name</label>
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
      <label htmlFor="skillLevel">Skill Level</label>
      <select
        className="input-box"
        id="skillLevel"
        name="skillLevel"
        value={formData.skillLevel}
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
        className="input-box textarea"
        id="description"
        name="description"
        rows={2}
        value={formData.description}
        onChange={handleInputChange}
        required
      />
    </div>
    {editingSkillId ? (
      <div className="edit-buttons">
        <button className="submit-button" type="submit">Save</button>
        <button className="cancel-button" type="button" onClick={clearForm} title="Cancel">×</button>
      </div>
    ) : (
      <button className="submit-button" type="submit">Add Skill</button>
    )}
  </form>
);

export default SkillForm;
