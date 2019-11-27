import Maker from '@makerdao/dai'
import McdPlugin from '@makerdao/dai-plugin-mcd';

export default function main() {
    async function run() {
        try {
            const maker = await Maker.create('http', {
                url: "http://192.168.0.23:8545",
                plugins: [
                    [McdPlugin, {}] // the second argument can be used to pass options to the plugin
                ]
            });

            const manager = maker.service('mcd:cdpManager');
            const vault = await manager.getCdp(224);
            console.log([
                vault.collateralAmount,
                vault.collateralValue, // value in USD given current price feed values
                vault.debtValue,
                vault.collateralizationRatio,
                vault.liquidationPrice
            ].map(x => x.toString()));
        } catch (e) {
            console.log(e)
        }
    }
    run().then(console.log);
}
