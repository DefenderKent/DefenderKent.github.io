class formCustom {
  data = {
    name: "login",
    fields: [
      {
        label: "Enter your login or email",
        input: {
          type: "text",
          required: true,
          placeholder: "login or email"
        }
      },
      {
        label: "Enter your password",
        input: {
          type: "password",
          required: true,
          placeholder: "password"
        }
      }
    ],
    references: [
      {
        text: "Forgot password?",
        ref: "rememberpassword"
      },
      {
        text: "Create new account",
        ref: "signup"
      }
    ],
    buttons: [
      {
        text: "Login"
      }
    ]
  };
  getInput = () => {
    if (this.data.fields === undefined) {
      return "";
    }
    return this.data.fields
      .map(function(f) {
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
  getReferences = () => {
    if (this.data.references === undefined) {
      return "";
    }
    return this.data.references
      .map(r => {
        return `<a href="#"> ${r.text}</a> <a href="#">${r.ref}</a> <a>${
          r["text without ref"] === undefined ? "" : r["text without ref"]
        }</a>`;
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
       <div class="title">${this.getName()}</div> 
        <div> 
            <div class="formWrap">
               ${this.getInput()}
                <div class="ref">${this.getReferences()}</div>
                

            </div>        
        </div>
          ${this.getbutton()}
         
      </form>
      
  </div>`);
  }
}
let app = new formCustom();

app.render();
