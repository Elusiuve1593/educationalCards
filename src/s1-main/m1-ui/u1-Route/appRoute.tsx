import React from 'react';
import {Navigate, Route, Routes} from 'react-router-dom';
import {ShowComponents} from '../../../s2-features/f0-test/ShowComponents';
import {PageNotFound} from '../PageNotFound/PageNotFound';
import {Login} from '../../../s2-features/f1-auth/a1-login/Login';
import {Registration} from '../../../s2-features/f1-auth/a2-registration/Registration';
import {ResetPassword} from '../../../s2-features/f1-auth/a3-resetPassword/ResetPassword';
import {NewPassword} from '../../../s2-features/f1-auth/a4-newPassword/NewPassword';
import {Profile} from '../../../s2-features/f2-profile/Profile';
import {
    login,
    newPassword,
    otherRoutes,
    pageNotFound,
    profile,
    registration,
    resetPassword,
    showComponents
} from './Variables/routeVariables';
import {Main} from '../Main';

export const AppRoute = () => {

    return (
        <Routes>
            <Route path={showComponents} element={<Main/>}>
                <Route path={otherRoutes} element={<Navigate to={pageNotFound}/>}/>
                <Route path={pageNotFound} element={<PageNotFound/>}/>

                <Route path={login} element={<Login/>}/>
                <Route path={registration} element={<Registration/>}/>
                <Route path={resetPassword} element={<ResetPassword/>}/>
                <Route path={newPassword} element={<NewPassword/>}/>

                <Route index element={<ShowComponents/>}/>
                <Route path={profile} element={<Profile/>}/>
            </Route>
        </Routes>
    );
};
