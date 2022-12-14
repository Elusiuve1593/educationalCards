import React, {useEffect} from 'react';

import styleContainer from '../../../s1-main/m1-ui/common/c2-styles/Container.module.css';
import style from './NewPassword.module.scss';
import styleBlock from '../../../s1-main/m1-ui/common/c2-styles/Block.module.css';

import {Button} from 's1-main/m1-ui/common/c1-components/Button/Button';
import {PasswordView} from 's1-main/m1-ui/common/c1-components/passwordView/PasswordView';
import {useAppDispatch, useAppSelector} from 's1-main/m2-bll/store';
import {Navigate, useParams} from 'react-router-dom';
import {useFormik} from 'formik';
import {setIsRequestSuccess, updatePassword} from 's1-main/m2-bll/reducers/auth-reducer';
import {PATH} from 's1-main/m1-ui/u1-Route/Variables/routeVariables';
import {getAppStatus} from '../../../s1-main/m2-bll/selectors/app-selectors';
import {getIsRequestSuccess} from '../../../s1-main/m2-bll/selectors/auth-selectors';

type FormikErrorType = {
    password?: string
    confirmPassword?: string
}

export const NewPassword = () => {
    const isRequestSuccess = useAppSelector(getIsRequestSuccess)
    const appStatus = useAppSelector(getAppStatus)
    const dispatch = useAppDispatch()
    const {token} = useParams()


    const formik = useFormik({
        initialValues: {
            password: '',
            confirmPassword: ''
        },
        validate: (values) => {
            const errors: FormikErrorType = {};

            if (!values.password) {
                errors.password = 'Required'
            } else if (values.password.length < 8) {
                errors.password = 'Put more then 8 symbols, please.'
            } else if (!values.password) {
                errors.password = 'Symbol required!'
            }
            if (!values.confirmPassword) {
                errors.confirmPassword = 'Required'
            } else if (values.confirmPassword.length < 8) {
                errors.confirmPassword = 'Put more then 8 symbols, please.'
            } else if (values.password !== values.confirmPassword) {
                errors.confirmPassword = 'Password not matched'
            }
            return errors
        },
        onSubmit: values => {
            if (token) {
                dispatch(updatePassword(values.password, token))
            }
            formik.resetForm()
        }
    })

    const errorPass = formik.touched.password && formik.errors.password ? formik.errors.password : ''
    const errorConfirmPassword = formik.touched.confirmPassword && formik.errors.confirmPassword ? formik.errors.confirmPassword : ''

    useEffect(() => {
        dispatch(setIsRequestSuccess(false))
    }, [])

    if (isRequestSuccess) {
        return <Navigate to={PATH.LOGIN}/>
    }

    return (
        <div>
            <div className={`${styleContainer.container} ${style.newPassContainer}`}>
                <form onSubmit={formik.handleSubmit}>
                    <div className={`${styleBlock.block} ${style.newPassBlock}`}>
                        <h1 className={style.header}>
                            Create new password
                        </h1>
                        <PasswordView placeholder={'Password'}
                                      className={style.input}
                                      error={errorPass}
                                      {...formik.getFieldProps('password')}
                        />
                        <PasswordView placeholder={'Confirm password'}
                                      className={style.input}
                                      error={errorConfirmPassword}
                                      {...formik.getFieldProps('confirmPassword')}
                        />
                        <span className={style.informationText}>
                        Create new password and we will send you further instructions to email
                    </span>
                        <Button type={'submit'} className={style.button} disabled={appStatus==='loading'}>Create new password</Button>
                    </div>
                </form>
            </div>
        </div>
    );
};