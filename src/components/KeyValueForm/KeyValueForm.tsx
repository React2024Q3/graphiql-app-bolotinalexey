'use client';

import React, { useEffect, useState } from 'react';

import useVariablesLS from '@/shared/hooks/useVariablesLS';
import { KeyValuePair } from '@/types&interfaces/types';
import recordToLS from '@/utils/recordToLS';
import { Box, Button, Grid, TextField } from '@mui/material';

type KeyValueFormProps = {
  onPairsChange: (pairs: KeyValuePair[]) => void;
  title: string;
  initPairs?: KeyValuePair[];
  isVars?: boolean;
};

const createNewPair = (): KeyValuePair => ({
  key: '',
  value: '',
  editable: true,
});

export default function KeyValueForm({
  onPairsChange,
  title,
  initPairs,
  isVars,
}: KeyValueFormProps) {
  const [pairs, setPairs] = useState<KeyValuePair[]>([createNewPair()]);
  const [error, setError] = useState<string | null>(null);
  const [vars, saveVarToLS] = useVariablesLS();

  useEffect(() => {
    if (isVars && vars && vars.length) {
      const pairsLS: KeyValuePair[] = vars.map(({ key, value }) => ({
        key,
        value,
        editable: false,
      }));
      setPairs([...pairsLS, createNewPair()]);
    }
  }, [isVars, vars]);

  useEffect(() => {
    if (initPairs && initPairs.length) {
      setPairs([...initPairs, createNewPair()]);
    }
  }, [initPairs]);

  const handleAddPair = () => {
    const lastPair = pairs[pairs.length - 1];
    if (lastPair.key.trim() !== '' && lastPair.value.trim() !== '') {
      setError(null);
      if (pairs.find(({ key, editable }) => key === lastPair.key.trim() && !editable)) {
        setError('Delete same key');
        return;
      }
      const updatedPairs = pairs.map((pair, index) =>
        index === pairs.length - 1 ? { ...pair, editable: false } : pair
      );
      setPairs([...updatedPairs, createNewPair()]);
      onPairsChange(updatedPairs);
      if (isVars) recordToLS(updatedPairs, saveVarToLS);
    } else {
      setError('Fill both key and value fields.');
    }
  };

  const handleChange = (index: number, field: 'key' | 'value', newValue: string) => {
    const newPairs = [...pairs];
    newPairs[index] = { ...newPairs[index], [field]: newValue };
    setPairs(newPairs);
  };

  const handleRemovePair = (index: number) => {
    const delPair = pairs.find((_, i) => i === index);
    if (delPair) delPair.editable = true;
    const newPairs = pairs.filter((p) => !p.editable);
    setPairs([...newPairs, createNewPair()]);
    onPairsChange(newPairs);
    if (isVars) recordToLS(newPairs, saveVarToLS);
  };

  return (
    <Box sx={{ width: '100%' }}>
      <h3>{title}</h3>
      <Grid container spacing={2} mt={1}>
        {pairs.map((pair, index) => (
          <Grid
            container
            item
            spacing={2}
            key={index}
            alignItems='top'
            style={{ maxWidth: 'calc( 100% - 70px )' }}
          >
            <Grid item xs={5}>
              <TextField
                label='Key'
                value={pair.key}
                onChange={(e) => handleChange(index, 'key', e.target.value)}
                fullWidth
                disabled={!pair.editable}
                error={Boolean(error && pair.editable && pair.key.trim() === '')}
                helperText={
                  error && pair.editable && pair.key.trim() === '' ? 'Please fill in the key' : ''
                }
              />
            </Grid>
            <Grid item xs={5}>
              <TextField
                label='Value'
                value={pair.value}
                onChange={(e) => handleChange(index, 'value', e.target.value)}
                fullWidth
                disabled={!pair.editable}
                error={Boolean(error && pair.editable && pair.value.trim() === '')}
                helperText={
                  error && pair.editable && pair.value.trim() === ''
                    ? 'Please fill in the value'
                    : ''
                }
              />
            </Grid>
            <Grid item xs={2}>
              {pair.editable ? (
                <Button
                  variant='outlined'
                  color='primary'
                  onClick={handleAddPair}
                  sx={{ height: '56px' }}
                >
                  Add
                </Button>
              ) : (
                <Button
                  variant='outlined'
                  color='error'
                  onClick={() => handleRemovePair(index)}
                  sx={{ height: '56px' }}
                >
                  Del
                </Button>
              )}
            </Grid>
            {error && pair.editable && (
              <Grid item xs={12} sx={{ pt: '0 !important' }}>
                <span style={{ color: 'red', fontSize: '0.8rem' }}>{error}</span>
              </Grid>
            )}
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}
