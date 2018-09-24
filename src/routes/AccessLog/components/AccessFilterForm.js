import React from 'react'

const renderField = ({input, label, type, meta: {touched, error, warning}}) => (
  <div>
    <label>{label}</label>
    <div>
      <input {...input} placeholder={label} type={type}/>
      {touched &&
      ((error && <span>{error}</span>) ||
        (warning && <span>{warning}</span>))}
    </div>
  </div>
)

const AccessFiltersForm = props => {
  const {handleSubmit, pristine, reset, submitting} = props
  return (
    <form className='access-filters card card-body' onSubmit={handleSubmit}>
      <input name="url" type="text" className='form-control' label="Url"/>
      <div>
        <label/>
        <div>
          <label>
            <input name="exclude-crm" type="checkbox" value="exclude-crm"/>{' '}
            Exclude CRM
          </label>
        </div>
      </div>
      <input name="user" type="text" className='form-control' />
      <div>
        <label/>
        <div>
          <label>
            <input name="exclude-user-me" type="checkbox" value="exclude-user-me"/>{' '}
            Exclude me
          </label>
        </div>
      </div>
      <input name="ip" type="text" className='form-control' />
      <div>
        <label/>
        <div>
          <label>
            <input name="exclude-ip-me" type="checkbox" value="exclude-ip-me"/>{' '}
            Exclude my IP
          </label>
        </div>
      </div>
      <div>
        <button type="submit" disabled={submitting}>
          Submit
        </button>
        <button type="button" disabled={pristine || submitting} onClick={reset}>
          Clear Values
        </button>
      </div>
    </form>
  )
}

export default AccessFiltersForm
