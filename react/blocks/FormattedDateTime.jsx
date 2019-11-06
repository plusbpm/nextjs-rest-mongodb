import { useEffect, useState } from 'react';

function FormattedDateTime({ dt }) {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), [mounted]);
  const date = new Date(dt);
  return date.toLocaleString(mounted ? undefined : 'en-US');
}

export default FormattedDateTime;
