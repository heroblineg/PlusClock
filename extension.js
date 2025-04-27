const { St, GLib, Clutter } = imports.gi;
const Main = imports.ui.main;
const PanelMenu = imports.ui.panelMenu;

let clockMenu;
let clockLabel;
let timeoutId;

function updateClock() {
    let now = new Date();
    let dateString = now.toLocaleDateString('ja-JP', { month: 'numeric', day: 'numeric' });
    let timeString = now.toLocaleTimeString('ja-JP', { hour: '2-digit', minute: '2-digit' });
    clockLabel.set_text(dateString + ' ' + timeString);
}

function init() {
    // 初期化処理（今は特にない）
}

function enable() {
    clockMenu = new PanelMenu.Button(0.0, "Custom Clock", false);
    clockLabel = new St.Label({
        text: '',
        y_align: Clutter.ActorAlign.CENTER
    });
    clockMenu.add_actor(clockLabel);
    Main.panel.addToStatusArea('custom-clock', clockMenu, 1, 'right');
    updateClock();
    timeoutId = GLib.timeout_add_seconds(GLib.PRIORITY_DEFAULT, 1, updateClock);
}

function disable() {
    if (timeoutId) {
        GLib.source_remove(timeoutId);
        timeoutId = null;
    }
    clockMenu.destroy();
    clockMenu = null;
}
