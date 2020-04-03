let data1 =
  '{"name":"website_color_scheme","fields":[{"label":"Choose color scheme","input":{"type":"color","colors":["#3366ff","#009933","#990033","#996633"]}},{"input":{"type":"checkbox","checked":"false"},"label":"Turn on dark theme?"}]}';

let data2 =
  '{"name":"login","fields":[{"label":"Enter your login or email","input":{"type":"text","required":true,"placeholder": "login or email"}},{"label":"Enter your password","input":{"type":"password","required":true,"placeholder": "password"}}],"references":[{"text":"Forgot password?","ref":"rememberpassword"},{"text":"Create new account","ref":"signup"}],"buttons":[{"text":"Login"}]}';

let data3 =
  '{"name":"register","fields":[{"input":{"type":"text","required":true,"placeholder":"Enter full name"}},{"input":{"type":"email","required":true,"placeholder":"Enter email"}},{"input":{"type":"password","required":true,"placeholder":"password"}},{"input":{"type":"password","required":true,"placeholder":"Confirm password"}}],"references":[{"text without ref":"Already have account?","text":"Login","ref":"signin"}],"buttons":[{"text":"Sign Up"}]}';

let data4 =
  '{"name":"interview","fields":[{"label":"Введите своё ФИО","input":{"type":"text","required":true,"placeholder":"Иванов Иван Иванович"}},{"label":"Введите Номер телефона","input":{"type":"number","required":true,"mask":"+7 (999) 99-99-999"}},{"label":"Введите свою Почту","input":{"type":"email","required":true,"placeholder":"example@mail.com"}},{"label":"Введите свой возраст","input":{"type":"number","required":true}},{"label":"Введите вашу специальность","input":{"type":"text","required":true}},{"label":"Выберете технологии, с которыми вы работали","input":{"type":"technology","required":true,"technologies":["PHP","JS","Laravel","Express.js","Yii2","HTML","CSS","Java"],"multiple":true}},{"label":"Ваш срок работы","input":{"type":"number","required":true}},{"label":"Ваша фотография","input":{"type":"file","required":true}},{"label":"Серия, номер","input":{"type":"number","required":true,"mask":"99-99 999999"}},{"label":"Код подразделения","input":{"type":"number","required":true,"mask":"999-999"}},{"label":"Скан / Фото паспорта (1 страница)","input":{"type":"file","required":true,"multiple":true,"filetype":["png","jpeg","pdf"]}},{"label":"Расскажите немного о себе","input":{"type":"textarea","required:":true}}],"references":[{"input":{"type":"checkbox","required":true,"checked":"false"}},{"text without ref":"I accept the","text":"Terms & Conditions","ref":"termsandconditions"}],"buttons":[{"text":"Send"},{"text":"Cancel"}]}';
let data5 =
  '{"name":"addpost","fields":[{"label":"Title","input":{"type":"text","required":true}},{"label":"Description","input":{"type":"textarea","required":true}},{"label":"Image","input":{"type":"file","required":true}},{"label":"Publish Date","input":{"type":"date","required":true}},{"label":"Author","input":{"type":"text"}}],"references":[{"input":{"type":"checkbox","required":true,"checked":"false"}},{"text without ref":"View Author Post","text":"View Author Post","ref":"viewauthor"}],"buttons":[{"text":"Create Post"}]}';
class formCustom {
  data = JSON.parse(data3);
  getInput = () => {
    if (this.data.fields === undefined) {
      return "";
    }
    return this.data.fields
      .map(function(f) {
        if (f.input.colors !== undefined) {
          return ``;
        }
        return `
               <div class="labelcustom"><label>${
                 f.label === undefined ? "" : f.label + ":"
               }</label></div> 
                    <div class="inputcustom">
                        <input
                            type="${f.input.type}" 
                            placeholder="${f.input.placeholder}"
                            required=${f.input.required}/>
                    </div> 
                `;
      })
      .join("");
  };
  getInputColor = () => {
    if (this.data.fields) {
      return this.data.fields
        .map(function(c) {
          if (c.input.colors !== undefined) {
            return `<div class="labelcustom">
            <label>${c.label === undefined ? "" : c.label + ":"}
              </label>
            </div>
            <div class="inputcustom">
              <input
                list="optionList"
                type="${c.input.type}" 
                placeholder="${c.input.placeholder}"
                required=${c.input.required}/>
            <datalist id="optionList">
              <option value=${c.input.colors}></option>
          </datalist>
      </div>  `;
          }
          return ` `;
        })
        .join("");
    }
  };
  getReferences = () => {
    if (this.data.references === undefined) {
      return "";
    }
    return this.data.references
      .map(r => {
        return `<a href="${r.ref}"> ${r.text}</a>${
          r["text without ref"] === undefined ? "" : r["text without ref"]
        }`;
      })
      .join("");
  };
  getName = () => {
    if (this.data.name === undefined) {
      return "";
    }

    return `<h2>${this.data.name}</h2>`;
  };
  getlabel = () => {
    return this.data.fields
      .map(function(l) {
        if (l.label === undefined) {
          return "";
        }
        return `<label>${l.label}</label>`;
      })
      .join("");
  };
  getbutton = () => {
    if (this.data.buttons === undefined) {
      return "";
    }
    return this.data.buttons.map(b => {
      return `<button>${b.text}</button>`;
    });
  };
  render() {
    return (document.getElementById("app").innerHTML = `<div>
      <form>
       <div class="title">
        ${this.getName()}
        </div>
        <div>
          <div class="formWrap">
            ${this.getInputColor()}
            ${this.getInput()}
              <div class="ref">
                ${this.getReferences()}
              </div>
            </div>
          </div>
            ${this.getbutton()}
      </form>
  </div>`);
  }
}
let app = new formCustom();

app.render();
