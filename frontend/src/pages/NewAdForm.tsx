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
      Titre de l'annonce:
      <br />
      <input className="text-field" type="text" name="titre" />
    </label>
    <br />
    <label>
      Description:
      <br />
      <input className="text-field" type="text" name="description" />
    </label>
    <br />
    <label>
      Prix:
      <br />
      <input className="text-field" type="number" name="price" />
    </label>
    <br />
    <label>
      URL de l'image:
      <br />
      <input className="text-field" type="text" name="link" />
    </label>

    <button className="button">Submit</button>
  </form>
);

export default NewAdFormPage;
