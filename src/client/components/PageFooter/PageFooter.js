import React from 'react';
import './PageFooter.scss';
import Link from '../Link';

/**
 * Подвал страницы
 */
function PageFooter() {
  return (
    <footer className="Page-Footer PageFooter">
      <div className="PageFooter-Container Container">
        <ul className="PageFooter-Menu">
          <li className="PageFooter-Item">
            <Link href="#support" label="Support" />
          </li>
          <li className="PageFooter-Item">
            <Link href="#learning" label="Learning" />
          </li>
        </ul>
        <div className="PageFooter-Copyright">
          &copy;2020 Your Name
        </div>
      </div>
    </footer>
  );
}

export default PageFooter;
