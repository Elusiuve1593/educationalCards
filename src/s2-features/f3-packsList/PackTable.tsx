import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import {PackType} from 's1-main/m3-dal/packApi';
import studyImg from 'assets/study.svg';
import editImg from 'assets/edit.svg';
import deleteImg from 'assets/delete.svg';
import {useAppDispatch, useAppSelector} from 's1-main/m2-bll/store';
import {deletePack, updatePack} from 's1-main/m2-bll/reducers/packs-reducer';
import {Link} from 'react-router-dom';
import {PackTableHeader} from './PackTableHeader';
import style from './PackTable.module.scss'
import { PATH } from 's1-main/m1-ui/u1-Route/Variables/routeVariables';

type TablePropsType = {
    packs: PackType[]
}

export function PackTable({packs}: TablePropsType) {
    const userID = useAppSelector(state => state.profile.profile._id)
    const dispatch = useAppDispatch()

    const deletePackHandle = (id: string) => {
        dispatch(deletePack(id))
    }
    const updatePackHandle = (id: string) => {
        dispatch(updatePack(id))
    }


    return (
        <TableContainer component={Paper}>
            <Table className={style.table}>
                <TableHead className={style.tableHead}>
                    <TableRow>
                        <PackTableHeader name={'Name'} align={'left'} sortName={'name'} className={style.name} />
                        <PackTableHeader name={'Cards'} align={'right'} sortName={'cardsCount'} className={style.cards}/>
                        <PackTableHeader name={'Last Updated'} align={'center'} sortName={'updated'} className={style.lastUpdated}/>
                        <PackTableHeader name={'Created by'} align={'center'} sortName={'user_name'} className={style.createdBy}/>
                        <TableCell align="left" className={style.actions}>Actions</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {packs.map((pack) => (
                        <TableRow
                            key={pack._id}
                            sx={{'&:last-child td, &:last-child th': {border: 0}}}
                        >
                            <TableCell align="left" sx={{overflowWrap: 'anywhere'}}>
                                <Link to={PATH.PACK + `${pack._id}`}>
                                    {pack.name}
                                </Link>
                            </TableCell>
                            <TableCell align="center">{pack.cardsCount}</TableCell>
                            <TableCell align="center">{String(pack.updated)}</TableCell>
                            <TableCell align="center">{pack.user_name}</TableCell>
                            <TableCell align="left">
																<span style={{display: 'flex', gap: '8px'}}>
																		<img src={studyImg} alt="study"
                                                                             style={{cursor: 'pointer'}}/>
                                                                    {userID === pack.user_id &&
                                                                        <>
                                                                            <img src={editImg} alt="edit"
                                                                                 style={{cursor: 'pointer'}}
                                                                                 onClick={() => updatePackHandle(pack._id)}
                                                                            />
                                                                            <img src={deleteImg} alt="delete"
                                                                                 style={{cursor: 'pointer'}}
                                                                                 onClick={() => deletePackHandle(pack._id)}/>
                                                                        </>
                                                                    }
																</span>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
}
