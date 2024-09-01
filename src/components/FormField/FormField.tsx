import { Controller, FieldValues, Path } from 'react-hook-form';

import styles from '@/shared/styles/auth.module.css';
import { getHelperText } from '@/utils/authHelpers';
import { TextField } from '@mui/material';

import { FormFieldProps } from './types';

export function FormField<T extends FieldValues>({
  name,
  control,
  label,
  type = 'text',
  required = true,
  errors,
}: FormFieldProps<T>) {
  return (
    <Controller
      name={name as Path<T>}
      control={control}
      render={({ field }) => (
        <TextField
          className={styles.auth__textfield}
          {...field}
          label={label}
          type={type}
          variant='outlined'
          required={required}
          error={!!errors[name as keyof typeof errors]}
          helperText={getHelperText(errors[name as keyof typeof errors]?.message?.toString())}
          fullWidth
          margin='normal'
        />
      )}
    />
  );
}
