const NewAdFormPage = () => (
  <form
    onSubmit={(e) => {
      e.preventDefault();
      const form = e.target;
      const formData = new FormData(form as HTMLFormElement);
      const formJson = Object.fromEntries(formData.entries());
      console.log(formJson);
    }}
  >
    <label>
      Titre de l'annonce
      <br />
      <input className="text-field" name="titre" />
    </label>

    <button className="button">Submit</button>
  </form>
);

export default NewAdFormPage;
