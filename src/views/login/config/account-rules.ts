export const rules = {
  name: [
    { required: true, message: "用户名是必传的!", trigger: "blur" },
    { min: 3, max: 11, message: "账号格式不正确!", trigger: "blur" }
  ],
  password: [
    { required: true, message: "密码是必传的!", trigger: "blur" },
    {
      pattern: /^[a-z0-9]{3,16}$/,
      message: "密码格式不正确!",
      trigger: "blur"
    }
  ]
}
