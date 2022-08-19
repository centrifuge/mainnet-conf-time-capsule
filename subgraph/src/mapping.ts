import { Transfer } from "../generated/TimeCapsule/TimeCapsule";
import { Nft } from "../generated/schema";

export function handleTransfer(event: Transfer): void {
  let nft = Nft.load(event.params.tokenId.toString());
  if (!nft) {
    nft = new Nft(event.params.tokenId.toString());
  }
  nft.owner = event.params.to;
  nft.save();
}
