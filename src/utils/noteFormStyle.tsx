{
  /* <section className={styles["note-form"]}>
  <h2>Add Note</h2>

  <form onSubmit={handleSubmit}>
    <div className={styles["form-group"]}>
      <div className={styles["form-control"]}>
        <label htmlFor="title">Title</label>
        <input
          id="title"
          type="text"
          name="title"
          value={formData.title}
          onChange={handleChange}
        />
        {validationErrors.title && (
          <p className={styles["error-message"]}>{validationErrors.title}</p>
        )}
      </div>

      <div className={styles["form-control"]}>
        <label htmlFor="content">Content</label>
        <input
          id="content"
          type="text"
          name="content"
          value={formData.content}
          onChange={handleChange}
        />
        {validationErrors.content && (
          <p className={styles["error-message"]}>{validationErrors.content}</p>
        )}
      </div>

      <div className={styles["form-control"]}>
        <label htmlFor="categoryId">Category</label>
        <select
          id="categoryId"
          name="categoryId"
          value={formData.categoryId}
          onChange={handleChange}
        >
          <option value="">Select a category</option>
          {categories?.categories.map((category) => (
            <option key={category._id} value={category._id}>
              {category.title}
            </option>
          ))}
        </select>
        {validationErrors.categoryId && (
          <p className={styles["error-message"]}>
            {validationErrors.categoryId}
          </p>
        )}
      </div>
    </div>

    <div className={styles["submit-button"]}>
      <button type="submit">Save</button>
    </div>
  </form>
</section>; */
}
