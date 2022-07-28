export const contentTableConfig = {
  title: "角色列表",
  propList: [
    { prop: "name", label: "角色名", minWidth: "100", slotName: "name" },
    {
      prop: "intro",
      label: "权限介绍",
      minWidth: "100",
      slotName: "intro"
    },
    {
      prop: "createAt",
      label: "创建时间",
      minWidth: "100",
      slotName: "createAt"
    },
    {
      prop: "updateAt",
      label: "更新时间",
      minWidth: "100",
      slotName: "updateAt"
    },
    {
      label: "操作",
      minWidth: "100",
      slotName: "handle"
    }
  ],
  showIndexColumn: true,
  selectColumn: true
}
