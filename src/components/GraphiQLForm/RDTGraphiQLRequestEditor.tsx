import { QueryEditor, VariableEditor, usePrettifyEditors } from '@graphiql/react';
import { Button } from '@mui/material';

import styles from './RDTGraphiQLRequestEditor.module.css';

export function RDTGraphiQLRequestEditor(props: {
  onQueryEdit: (value: string) => void;
  onQueryVariablesEdit: (value: string) => void;
}) {
  const prettify = usePrettifyEditors();

  //console.log(`RDTGraphiQLInterface rerender and initialResponse is ${initialResponse}`);
  return (
    <>
      {/* <div className='graphiql-container'> */}
      <div className={styles['query-and-vars-box']}>
        <div className={styles['query-editor']}>
          <QueryEditor onEdit={props.onQueryEdit}></QueryEditor>
        </div>
        <div className={styles['variables-editor']}>
          <VariableEditor onEdit={props.onQueryVariablesEdit}></VariableEditor>
        </div>
      </div>
      <Button variant='contained' sx={{ width: '200px' }} onClick={prettify}>
        Prettify query (Shift-Ctrl-P)
      </Button>
    </>
  );
}