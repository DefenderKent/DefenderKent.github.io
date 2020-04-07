let dataColor =
  '{"name":"website_color_scheme","fields":[{"label":"Choose color scheme","input":{"type":"color","colors":["#3366ff","#009933","#990033","#996633"]}},{"input":{"type":"checkbox","checked":"false"},"label":"Turn on dark theme?"}]}';

let dataLogin =
  '{"name":"login","fields":[{"label":"Enter your login or email","input":{"type":"text","required":true,"placeholder": "login or email"}},{"label":"Enter your password","input":{"type":"password","required":true,"placeholder": "password"}}],"references":[{"text":"Forgot password?","ref":"rememberpassword"},{"text":"Create new account","ref":"signup"}],"buttons":[{"text":"Login"}]}';

let dataRegister =
  '{"name":"register","fields":[{"input":{"type":"text","required":true,"placeholder":"Enter full name"}},{"input":{"type":"email","required":true,"placeholder":"Enter email"}},{"input":{"type":"password","required":true,"placeholder":"password"}},{"input":{"type":"password","required":true,"placeholder":"Confirm password"}}],"references":[{"text without ref":"Already have account?","text":"Login","ref":"signin"}],"buttons":[{"text":"Sign Up"}]}';

let dataInterview =
  '{"name":"interview","fields":[{"label":"Введите своё ФИО","input":{"type":"text","required":true,"placeholder":"Иванов Иван Иванович"}},{"label":"Введите Номер телефона","input":{"type":"number","required":true,"mask":"+7 (999) 99-99-999"}},{"label":"Введите свою Почту","input":{"type":"email","required":true,"placeholder":"example@mail.com"}},{"label":"Введите свой возраст","input":{"type":"number","required":true}},{"label":"Введите вашу специальность","input":{"type":"text","required":true}},{"label":"Выберете технологии, с которыми вы работали","input":{"type":"technology","required":true,"technologies":["PHP","JS","Laravel","Express.js","Yii2","HTML","CSS","Java"],"multiple":true}},{"label":"Ваш срок работы","input":{"type":"number","required":true}},{"label":"Ваша фотография","input":{"type":"file","required":true}},{"label":"Серия, номер","input":{"type":"number","required":true,"mask":"99-99 999999"}},{"label":"Код подразделения","input":{"type":"number","required":true,"mask":"999-999"}},{"label":"Скан / Фото паспорта (1 страница)","input":{"type":"file","required":true,"multiple":true,"filetype":["png","jpeg","pdf"]}},{"label":"Расскажите немного о себе","input":{"type":"textarea","required:":true}}],"references":[{"input":{"type":"checkbox","required":true,"checked":"false"}},{"text without ref":"I accept the","text":"Terms & Conditions","ref":"termsandconditions"}],"buttons":[{"text":"Send"},{"text":"Cancel"}]}';
let dataAddPost =
  '{"name":"addpost","fields":[{"label":"Title","input":{"type":"text","required":true}},{"label":"Description","input":{"type":"textarea","required":true}},{"label":"Image","input":{"type":"file","required":true}},{"label":"Publish Date","input":{"type":"date","required":true}},{"label":"Author","input":{"type":"text"}}],"references":[{"input":{"type":"checkbox","required":true,"checked":"false"}},{"text without ref":"View Author Post","text":"View Author Post","ref":"viewauthor"}],"buttons":[{"text":"Create Post"}]}';

//константы для метода getMask для обработки возможных вариантов
const numberPhone = "+7 (999) 99-99-999";
const pasport = "99-99 999999";
const unitCode = "999-999";
//класс для формы
class formCustom {
  constructor(name) {
    this.data = JSON.parse(name);
  }
  // получаем доступ к fields и перебераем все поля
  getInput = () => {
    if (this.data.fields === undefined) {
      return "";
    }
    return this.data.fields.map(this.inputCreator).join("");
  };
  // обрабатываем все возможные варианты (ВНИМАНИЕ:при добавлении нового fields обработать новое поведение в методе inputCreator)
  inputCreator = fields => {
    const getMask = fields => {
      $(function() {
        var phoneMask = IMask(document.getElementById("phone-mask"), {
          mask: "+{7}(000)000-00-00"
        });
        var phoneMask2 = IMask(document.getElementById("pasport-mask"), {
          mask: "00-00 000000"
        });
        var phoneMask3 = IMask(document.getElementById("unitCode-mask"), {
          mask: "000-000"
        });
      });
      switch (fields.input.mask) {
        case numberPhone:
          return `<input id="phone-mask"
          type="${fields.input.type === "number" ? "text" : fields.input.type}" 
        placeholder="${fields.input.mask}" >
        `;
        case pasport:
          return `<input id="pasport-mask"
          type="${fields.input.type === "number" ? "text" : fields.input.type}" 
        placeholder="${fields.input.mask}" >
        `;
        case unitCode:
          return `<input id="unitCode-mask"
          type="${fields.input.type === "number" ? "text" : fields.input.type}" 
        placeholder="${fields.input.mask}" >
        `;
        default:
          return "";
      }
    };
    if (fields.input.colors !== undefined) {
      return `<div class="labelcustom">
                    <label>${
                      fields.label === undefined ? "" : fields.label + ":"
                    }</label>
              
                      <input
                        list="optionList"
                        type="${fields.input.type}" 
                        placeholder="${fields.input.placeholder}"
                        required=${fields.input.required}
                        value="${fields.input.colors[0]}"
                        />
                        
                      <datalist id="optionList">
                        <option value=${fields.input.colors[0]}></option>
                        <option value=${fields.input.colors[1]}></option>
                        <option value=${fields.input.colors[2]}></option>
                        <option value=${fields.input.colors[3]}></option>
                      </datalist>
                     
                  </div>`;
    } else if (fields.label === "Turn on dark theme?") {
      return `<div class="colorCheckbox">
      <label>${fields.label === undefined ? "" : fields.label + ":"}
           </label><input type="${fields.input.type}">
        </div>`;
    } else if (fields.input.type === "textarea") {
      return `<div class="inpuTextarea">
      <label>
        ${fields.label === undefined ? "" : fields.label + ":"}
      </label>
       <textarea placeholder="Enter text"></textarea>
      </div>`;
    }

    return `<div class="inputcustom">
              <label>
                ${fields.label === undefined ? "" : fields.label + ":"}
              </label>
                      ${
                        fields.input.mask !== undefined
                          ? getMask(fields)
                          : `${
                              fields.input.type === "technology"
                                ? `<div class="technology-wrap">
                                      <div class="technology-wrap__block">
                                        <label for="php">${fields.input.technologies[0]}</label>
                                        <input id="php" type="checkbox">
                                      </div>
                                      <div class="technology-wrap__block">
                                        <label for="js">${fields.input.technologies[1]}</label>
                                        <input id="js" type="checkbox">
                                      </div>
                                      <div class="technology-wrap__block">
                                        <label for="Laravel">${fields.input.technologies[2]}</label>
                                        <input id="Laravel" type="checkbox">
                                      </div>
                                      <div class="technology-wrap__block">
                                        <label for="Express">${fields.input.technologies[3]}</label>
                                        <input id="Express" type="checkbox">
                                      </div>
                                      <div class="technology-wrap__block">
                                        <label for="Yii2">${fields.input.technologies[4]}</label>
                                        <input id="Yii2" type="checkbox">
                                      </div>
                                      <div class="technology-wrap__block">
                                        <label for="HTML">${fields.input.technologies[5]}</label>
                                        <input id="HTML" type="checkbox">
                                      </div>
                                      <div class="technology-wrap__block">
                                        <label for="CSS">${fields.input.technologies[6]}</label>
                                        <input id="CSS" type="checkbox">
                                      </div>
                                      <div class="technology-wrap__block">
                                        <label for="Java">${fields.input.technologies[7]}</label>
                                        <input id="Java" type="checkbox">
                                      </div>
                                   </div>
                                      `
                                : `<input
                                type="${fields.input.type}" 
                                placeholder="${
                                  fields.input.mask !== undefined
                                    ? fields.input.mask
                                    : ""
                                }${
                                    fields.input.placeholder !== undefined
                                      ? fields.input.placeholder
                                      : ""
                                  }"
                                
                                required=${fields.input.required}
                                accept="${
                                  fields.input.filetype === undefined
                                    ? ""
                                    : fields.input.filetype
                                        .map(ud => {
                                          return "." + ud;
                                        })
                                        .join(", ")
                                }"/>`
                            }`
                      }                  
                    </div> 
                `;
  };
  // получаем ссылки
  getReferences = () => {
    if (this.data.references === undefined) {
      return "";
    }

    return this.data.references
      .map(r => {
        if (r.input !== undefined) {
          return `<input class="inputBox" type ="${r.input.type}">
          <a href="${r.ref}"></a>
          ${r["text without ref"] === undefined ? "" : r["text without ref"]}
          `;
        }
        return `
        ${
          r["text without ref"] === undefined ? "" : r["text without ref"]
        }<a href="${r.ref}"> ${r.text}</a>`;
      })
      .join("");
  };
  // получаем имя формы
  getName = () => {
    if (this.data.name === undefined) {
      return "";
    }

    return `<h2>${this.data.name}</h2>`;
  };
  //получаем все кнопки
  getbutton = () => {
    if (this.data.buttons === undefined) {
      return "";
    }
    return this.data.buttons
      .map(b => {
        return `<button>${b.text}</button>`;
      })
      .join("");
  };
  //в методе рендер отрисовываем  основную форму
  render() {
    return (document.getElementById("app").innerHTML = `<div>
      <form class="form">
       <div class="title">
        ${this.getName()}
        </div>
        <div>
          <div class="formWrap">
             
            ${this.getInput()}
              <div class="ref">
                ${this.getReferences()}
              </div>
            </div>
          </div>
         <div class="btn-block">${this.getbutton()}</div>   
      </form>
  </div>`);
  }
}
// создаем экземпляры класса formCustom с нужным вам JSON-ом
let formColor = new formCustom(dataColor);
let formLogin = new formCustom(dataLogin);
let formReg = new formCustom(dataRegister);
let formInterview = new formCustom(dataInterview);
let formAddPost = new formCustom(dataAddPost);

rend.onclick = function() {
  formColor.render();
};
rend2.onclick = function() {
  formLogin.render();
};
rend3.onclick = function() {
  formReg.render();
};
rend4.onclick = function() {
  formInterview.render();
};
rend5.onclick = function() {
  formAddPost.render();
};
formLogin.render();
