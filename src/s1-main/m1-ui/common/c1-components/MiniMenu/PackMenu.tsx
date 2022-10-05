import React, {useEffect, useRef} from 'react'
import s from './PackMenu.module.scss'
import editImg from 's1-main/m1-ui/common/c3-image/edit.svg'
import learnImg from 's1-main/m1-ui/common/c3-image/study.svg'
import deleteImg from 's1-main/m1-ui/common/c3-image/delete.svg'
import {Link} from 'react-router-dom';
import {PATH} from '../../../u1-Route/Variables/routeVariables';

interface IProps {
		closeMenu: () => void
		packId: string
}

export const PackMenu = ({closeMenu, packId}: IProps) => {
		const menuRef = useRef<HTMLDivElement>(null)

		const onClickOutsideMenu = (e: any) => {
				setTimeout(() => {
						if (menuRef.current && !menuRef.current.contains(e.target)) {
								closeMenu()
						}
				}, 1)
		}
		const onDeleteClick = () => {
				//вызывать модалку
		}

		const onEditClick = () => {
				//вызывать модалку
		}

		useEffect(() => {
				document.addEventListener('mouseup', onClickOutsideMenu)
		}, [])

		useEffect(() => {
				return () => {
						document.removeEventListener('mouseup', onClickOutsideMenu)
				}
		}, [])
		return (
				<div ref={menuRef} className={s.wrapper}>
						<div className={s.menuItem} onClick={onEditClick}><img src={editImg} alt="edit"/>Edit</div>
						<div className={s.menuItem} onClick={onDeleteClick}><img src={deleteImg} alt="delete"/>Delete</div>
						<Link to={PATH.PACK + packId + PATH.LEARN}>
								<div className={s.menuItem}>
										<img src={learnImg} alt="learn"/>
										Learn
								</div>
						</Link>
				</div>
		)
}