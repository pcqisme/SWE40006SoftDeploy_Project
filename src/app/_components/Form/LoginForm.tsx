import React from 'react';

const LoginForm = () => {
  return (
    <form>
      <button className='' type='submit' name='action' value='google'>
        Sign In with Google
      </button>
      <button type='submit' name='action' value='github'>
        Sign In with Github
      </button>
    </form>
  );
};

export default LoginForm;