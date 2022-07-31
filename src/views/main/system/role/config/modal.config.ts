import { IForm } from "@/base-ui/form"

export const modalFormConfig: IForm = {
  labelWidth: "120px",
  itemLayout: {
    padding: "10px 10px"
  },
  colLayout: {
    span: 24
  },
  formItems: [
    {
      field: "name",
      type: "input",
      label: "用户名",
      rules: [],
      placeholder: "请输入用户名"
    },
    {
      field: "intro",
      type: "input",
      label: "角色介绍",
      placeholder: "请输入角色介绍"
    }
  ]
}
