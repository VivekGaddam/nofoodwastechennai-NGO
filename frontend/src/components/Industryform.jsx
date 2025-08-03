import React from 'react'

const Industryform = () => {
  return (
    <div>
     <form action="">
        <div className="form-group">
          <label htmlFor="industry">Industry</label>        
            <input type="text" className="form-control" id="industry" placeholder="Enter your industry" />
        </div>
        <div className="form-group">

            <label htmlFor="desc">Description</label>
            <textarea className="form-control" id="desc" rows="3" placeholder="Enter a brief description of your industry"></textarea>
        </div>
       

     </form>
    </div>
  )
}

export default Industryform
