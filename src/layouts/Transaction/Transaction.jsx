import React from 'react';
import Link from 'next/link';

function Transaction() {
  return (
    <div>
      Transaction form
      <br />
      <Link href="/cabinet">
        <a>Back</a>
      </Link>
    </div>
  );
}

export default Transaction;
