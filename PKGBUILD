# Maintainer: Your Name <your.email@example.com>

pkgname=nirimod-ru-git
pkgver=0.1.0
pkgrel=1
pkgdesc="Russian-translated fork of nirimod - A polished GTK4/libadwaita GUI configurator for the niri Wayland compositor"
arch=('x86_64')
url="https://github.com/y-tretyakov/nirimod-ru"
license=('MIT')
depends=(
  'python-gobject'
  'gtk4'
  'libadwaita'
  'pycairo'
)
makedepends=(
  'git'
  'python-build'
  'python-installer'
  'python-hatchling'
  'python-wheel'
  'python-packaging'
)
provides=('nirimod')
conflicts=('nirimod' 'nirimod-git')
source=("$pkgname::git+https://github.com/y-tretyakov/nirimod-ru.git")
sha256sums=('SKIP')
validpgpkeys=()

pkgver() {
  cd "$srcdir/$pkgname"
  git describe --long --tags 2>/dev/null | sed 's/^v//;s/\([^-]*-g\)/r\1/;s/-/./g' || printf "r%s.%s" "$(git rev-list --count HEAD)" "$(git log -1 --format='%cd' --date=format:'%Y%m%d')"
}

build() {
  cd "$srcdir/$pkgname"
  python -m build --wheel --no-isolation
}

package() {
  cd "$srcdir/$pkgname"
  python -m installer --prefix="$pkgdir/usr" dist/*.whl

  install -Dm644 data/nirimod.svg "$pkgdir/usr/share/icons/hicolor/scalable/apps/nirimod.svg"

  install -Dm644 /dev/stdin "$pkgdir/usr/share/applications/io.github.nirimod.desktop" <<EOF
[Desktop Entry]
Version=1.0
Name=NiriMod
GenericName=Настройки композитора
Comment=Графический менеджер настроек для Wayland композитора Niri
Exec=nirimod
Icon=nirimod
Terminal=false
Type=Application
Categories=Utility;Settings;DesktopSettings;
Keywords=compositor;windowmanager;wayland;niri;settings;config;
StartupNotify=true
StartupWMClass=nirimod
EOF

  gtk-update-icon-cache -q -t -f "$pkgdir/usr/share/icons/hicolor" || true
}
