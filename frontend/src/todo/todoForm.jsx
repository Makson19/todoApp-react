import React from 'react';
import Grid from '../template/grid';
import IconButton from '../template/iconButton';

function todoForm(props) {
  const keyHandler = (e) => {
    if(e.key === 'Enter') {
      e.shiftKey ? props.handleSearch() : props.handleAdd();
    } else if(e.key === 'Escape') {
      props.handleClear();
    }
  }

  return (
    <div role="form" className="todoForm">
        <Grid cols="12 9 10">
            <input 
              type="text" 
              id="description" 
              className="form-control" 
              placeholder="Adicione uma tarefa"
              value={props.description}
              onKeyUp={keyHandler}
              onChange={props.handleChange}
            />
        </Grid>

        <Grid cols="12 3 2">  
            <IconButton 
              style="primary" 
              icon="plus"
              onClick={props.handleAdd}
            />

            <IconButton 
              style="info" 
              icon="search"
              onClick={props.handleSearch}
            />

            <IconButton 
              style="default" 
              icon="close"
              onClick={props.handleClear}
            />
        </Grid>
    </div>
  )
}

export default todoForm;