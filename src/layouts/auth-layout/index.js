import React, {useEffect} from 'react';
import styles from './styles.module.scss';
import './styles.scss';
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { goToPageSuccess } from 'modules/app/states';


function AuthLayout(props) {
  const { children } = props;
  const goToPage = useSelector(state => state.app.goToPage);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    if (goToPage.path && !goToPage.redirected) {
      dispatch(goToPageSuccess());
      navigate(goToPage.path);
    }
  }, [goToPage, navigate, dispatch]);

  return (
    <div className={styles.layoutAuthWrap}>
      <div className={styles.mainWrap}>
        <div className={styles.form}>
          { children }
        </div>
      </div>
    </div>
  );
}

export default AuthLayout;
