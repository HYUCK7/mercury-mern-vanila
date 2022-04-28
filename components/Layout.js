import style from "@/styles/Layout.module.css";
import { Modal, Pagenation, Nav, Table, Header, Footer} from '@/components'

export function Layout({children}) {
    return (<div className={style.container}>

        <main className={style.main}>{children}</main>
        <Table/>
        <Pagenation/>
        <Modal/>
    </div>
  );
}