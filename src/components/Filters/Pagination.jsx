import React from "react";
import classNames from "classnames";
import { inject, observer } from "mobx-react";

@inject(({ moviesPageStore }) => ({
  moviesPageStore
}))
@observer
class Pagination extends React.Component {
  render() {
    const {
      moviesPageStore: { page, prevPage, nextPage, total_pages }
    } = this.props;
    return (
      <nav className="d-flex align-items-center">
        <ul className="pagination mb-0 mr-3">
          <li
            className={classNames("page-item", {
              disabled: page === 1
            })}
          >
            <span className="page-link" onClick={prevPage}>
              Назад
            </span>
          </li>
          <li className="page-item">
            <span className="page-link" onClick={nextPage}>
              Вперед
            </span>
          </li>
        </ul>
        <span>
          {page} из {total_pages}
        </span>
      </nav>
    );
  }
}

export default Pagination;
