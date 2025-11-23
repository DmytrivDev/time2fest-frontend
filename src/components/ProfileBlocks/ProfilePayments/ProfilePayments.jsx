import { useTranslation } from 'react-i18next';

import { getValidLocale } from '@/utils/getValidLocale';
import { api } from '@/utils/api';

import clsx from 'clsx';

import styles from './ProfilePayments.module.scss';

export default function ProfilePayments() {
  const { t } = useTranslation();

  return (
    <div className={styles.profileContent}>
      <div className={styles.heading}>
        <div>
          <h1>{t('profile.payTtl')}</h1>
        </div>
      </div>

      <div className={styles.payments}>
        <div>
          <div className={styles.payment__heading}>
            <div className={styles.coll}>{t('profile.payC1')}</div>
            <div className={styles.coll}>{t('profile.payC2')}</div>
            <div className={styles.coll}>{t('profile.payC3')}</div>
            <div className={styles.coll}>{t('profile.payC4')}</div>
            <div className={styles.coll}>{t('profile.payC5')}</div>
            <div className={styles.coll}>{t('profile.payC6')}</div>
            <div className={styles.coll}>{t('profile.payC7')}</div>
          </div>

          <ul className={styles.payments__list}>
            <li className={styles.payments__item}>
              <div className={styles.coll}>
                <div>{t('profile.payC1')}</div>
                <div>H_31555706</div>
              </div>
              <div className={styles.coll}>
                <div>{t('profile.payC2')}</div>
                <div>HCY-18350242</div>
              </div>
              <div className={styles.coll}>
                <div>{t('profile.payC3')}</div>
                <div>Підписка</div>
              </div>
              <div className={styles.coll}>
                <div>{t('profile.payC4')}</div>
                <div>Новий рік</div>
              </div>
              <div className={styles.coll}>
                <div>{t('profile.payC5')}</div>
                <div>2025-10-20</div>
              </div>
              <div className={styles.coll}>
                <div>{t('profile.payC6')}</div>
                <div>9.99$</div>
              </div>
              <div className={styles.coll}>
                <button type="button">
                  <span>{t('profile.payC7')}</span>
                </button>
              </div>
            </li>

            <li className={styles.payments__item}>
              <div className={styles.coll}>
                <div>{t('profile.payC1')}</div>
                <div>H_31555706</div>
              </div>
              <div className={styles.coll}>
                <div>{t('profile.payC2')}</div>
                <div>HCY-18350242</div>
              </div>
              <div className={styles.coll}>
                <div>{t('profile.payC3')}</div>
                <div>Підписка</div>
              </div>
              <div className={styles.coll}>
                <div>{t('profile.payC4')}</div>
                <div>Новий рік</div>
              </div>
              <div className={styles.coll}>
                <div>{t('profile.payC5')}</div>
                <div>2025-10-20</div>
              </div>
              <div className={styles.coll}>
                <div>{t('profile.payC6')}</div>
                <div>9.99$</div>
              </div>
              <div className={styles.coll}>
                <button type="button">
                  <span>{t('profile.payC7')}</span>
                </button>
              </div>
            </li>

            <li className={styles.payments__item}>
              <div className={styles.coll}>
                <div>{t('profile.payC1')}</div>
                <div>H_31555706</div>
              </div>
              <div className={styles.coll}>
                <div>{t('profile.payC2')}</div>
                <div>HCY-18350242</div>
              </div>
              <div className={styles.coll}>
                <div>{t('profile.payC3')}</div>
                <div>Підписка</div>
              </div>
              <div className={styles.coll}>
                <div>{t('profile.payC4')}</div>
                <div>Новий рік</div>
              </div>
              <div className={styles.coll}>
                <div>{t('profile.payC5')}</div>
                <div>2025-10-20</div>
              </div>
              <div className={styles.coll}>
                <div>{t('profile.payC6')}</div>
                <div>9.99$</div>
              </div>
              <div className={styles.coll}>
                <button type="button">
                  <span>{t('profile.payC7')}</span>
                </button>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
