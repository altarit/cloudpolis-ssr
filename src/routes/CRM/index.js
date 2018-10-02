export default (store, history) => ({
  path: '/crm',
  name: 'crm',
  getComponent() {
    return Promise.all([
      import('./containers/CRMContainer'),
      import('./modules/crm'),
    ])
  }
})
