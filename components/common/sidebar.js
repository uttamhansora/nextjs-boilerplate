import { Icon } from "@iconify/react";
import Link from "next/link";
import { useRouter } from "next/router";
import { useTranslation } from "react-i18next";

const AccountSidebar = (props) => {
  const {t} = useTranslation()
  const router = useRouter();
  return (
    <div className="col-lg-3 col-md-12">
      {props.user_info.role == 2 && (
        <div className="dashboard__sidebar mb-24 sidebar-top">
          <h4 className="pannel-title">{t("Contributor Pannel")}</h4>
          <ul className="dashboard-menu">
            <li>
              <Link
                href="/account/upload"
                className={router.asPath == "/account/upload" ? "active" : ""}
              >
                <div className="item-left">
                  <Icon
                    icon="heroicons-outline:upload"
                    width="24"
                    height="24"
                  />
                  <span>{t("Upload Product")}</span>
                </div>
              </Link>
            </li>
            <li>
              <Link
                href="/account/my-product"
                className={
                  router.asPath == "/account/my-product" ? "active" : ""
                }
              >
                <div className="item-left">
                  <Icon icon="lucide:box" width="24" height="24" />
                  <span>{t("My Products")}</span>
                </div>
              </Link>
            </li>
            <li>
              <Link
                href="/account/all-sales"
                className={
                  router.asPath == "/account/all-sales" ? "active" : ""
                }
              >
                <div className="item-left">
                  <Icon
                    icon="icon-park-outline:sales-report"
                    width="24"
                    height="24"
                  />
                  <span>{t("All Sales")}</span>
                </div>
              </Link>
            </li>
            <li>
              <Link
                href="/account/all-download"
                className={
                  router.asPath == "/account/all-download" ? "active" : ""
                }
              >
                <div className="item-left">
                  <Icon
                    icon="heroicons-outline:download"
                    width="24"
                    height="24"
                  />
                  <span>{t("All Download")}</span>
                </div>
              </Link>
            </li>
            <li>
              <Link
                href="/account/my-earnings"
                className={
                  router.asPath == "/account/my-earnings" ? "active" : ""
                }
              >
                <div className="item-left">
                  <Icon icon="bi:currency-dollar" width="24" height="24" />
                  <span>{t("My Earnings")}</span>
                </div>
              </Link>
            </li>
          </ul>
        </div>
      )}
      <div className="dashboard__sidebar">
        <h4 className="pannel-title">{t("User Pannel")}</h4>
        <ul className="dashboard-menu">
          <li>
            <Link
              href="/account/favourites"
              className={router.asPath == "/account/favourites" ? "active" : ""}
            >
              <div className="item-left">
                <Icon icon="akar-icons:heart" width="24" height="24" />
                <span>{t("Favourites")}</span>
              </div>
            </Link>
          </li>
          <li>
            <Link
              href="/account/downloads"
              className={router.asPath == "/account/downloads" ? "active" : ""}
            >
              <div className="item-left">
                <Icon
                  icon="heroicons-outline:download"
                  width="24"
                  height="24"
                />
                <span>{t("My Download")}</span>
              </div>
            </Link>
          </li>
          <li>
            <Link
              href="/account/my_purchases"
              className={router.asPath == "/account/my_purchases" ? "active" : ""}
            >
              <div className="item-left">
                <Icon
                  icon="heroicons-outline:download"
                  width="24"
                  height="24"
                />
                <span>{t("My Purchases")}</span>
              </div>
            </Link>
          </li>
          <li>
            <Link
              href="/account/following"
              className={router.asPath == "/account/following" ? "active" : ""}
            >
              <div className="item-left">
                <Icon icon="lucide:user-plus" width="24" height="24" />
                <span>{t("Following")}</span>
              </div>
            </Link>
          </li>
          <li>
            <Link
              href="/account/boards"
              className={router.asPath == "/account/boards" ? "active" : ""}
            >
              <div className="item-left">
                <Icon icon="fluent:board-24-regular" width="24" height="24" />
                <span>{t("Boards")}</span>
              </div>
            </Link>
          </li>
          <li>
            <Link
              href="/account/profile"
              className={router.asPath == "/account/profile" ? "active" : ""}
            >
              <div className="item-left">
                <Icon icon="fa-regular:user" width="24" height="24" />
                <span>{t("Profile")}</span>
              </div>
            </Link>
          </li>
          <li>
            <Link
              href="/account/my-wallet"
              className={router.asPath == "/account/my-wallet" ? "active" : ""}
            >
              <div className="item-left">
                <Icon icon="clarity:wallet-line" width="24" height="24" />
                <span>{t("Wallet")}</span>
              </div>
            </Link>
          </li>
          <li>
            <Link
              href="/account/devices"
              className={router.asPath == "/account/devices" ? "active" : ""}
            >
              <div className="item-left">
                <Icon icon="ep:monitor" width="24" height="24" />
                <span>{t("Devices")}</span>
              </div>
            </Link>
          </li>
          <li>
            <Link
              href="/account/order"
              className={router.asPath == "/account/order" ? "active" : ""}
            >
              <div className="item-left">
                <Icon
                  icon="icon-park-outline:transaction-order"
                  width="24"
                  height="24"
                />
                <span>{t("Order History")}</span>
              </div>
            </Link>
          </li>
          <li>
            <Link
              href="/account/my-subscription"
              className={
                router.asPath == "/account/my-subscription" ? "active" : ""
              }
            >
              <div className="item-left">
                <Icon icon="tabler:credit-card" width="24" height="24" />
                <span>{t("My Subscription")}</span>
              </div>
            </Link>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default AccountSidebar;
