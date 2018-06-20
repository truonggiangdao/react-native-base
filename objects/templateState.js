const TYPE = {
  header: "Header",
  footer: "Footer",
}

initialData = () => {
  return {
    template: '',
  }
}

setCurrentTemplate = (template) => {
  return {
    template,
  }
}

wrapJSONToTemplateObject = (jsonData) => {
  const template = {
    "footer": '',
    "header": '',
  }
  jsonData.data.forEach(item => {
    if (item.template_type === TYPE.header) {
      template.header = item
    } else {
      template.footer = item
    }
  });
  return template;
}

export default templateState = {
  initialData,
  setCurrentTemplate,
  wrapJSONToTemplateObject,
}