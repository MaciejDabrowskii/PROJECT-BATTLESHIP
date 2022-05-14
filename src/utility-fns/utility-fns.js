// selects elements by querySelector examples:
// qs(".wrapper");
// qs(".btn")

export function qs(selector, parent = document)
{
  return parent.querySelector(selector);
}

// selects elements by querySelectorAll and returns array examples:
// qsa("li")
// qsa(".btn", qs(".wrapper")) - selects all bnts in wrapper

export function qsa(selector, parent = document)
{
  return [...parent.querySelectorAll(selector)];
}

// add globalEventListener examples:
// addGlobalEventListener("click", ".btn", e=>{console.log (e.target.textContent)})
// addGlobalEventListener("click", ".btn", ()=> console.log("Runs onece"), {
//     once: true,
// })
// addGlobalEventListener(
//     "click",
//      ".btn",
//       ()=> console.log("works only on wrapper"),
//       {},
//       qs(".wrapper")
//       )

export function addGlobalEventListener(
  type,
  selector,
  callback,
  options,
  parent = document,
)
{
  parent.addEventListener(
    type,
    (e) =>
    {
      if (e.target.matches(selector)) callback(e);
    },
    options,
  );
}
// creates DOM element with attributes passed in object, examples:
// const element = createElement("button", {
//   class: "btn",
//   text: "NEW",
//   dataset: { test: true },
//   id: "new",
//   "data-hi": "Yes",
// });
// qs(".wrapper").append(element);

export function createElement(type, options = {})
{
  const element = document.createElement(type);
  Object.entries(options)
    .forEach(([key, value]) =>
    {
      if (key === "class")
      {
        element.classList.add(value);
      }

      if (key === "dataset")
      {
        Object.entries(value)
          .forEach(([dataKey, dataValue]) =>
          {
            element.dataset[dataKey] = dataValue;
          });
      }
      if (key === "text")
      {
        element.textContent = value;
      }

      element.setAttribute(key, value);
    });
  return element;
}
